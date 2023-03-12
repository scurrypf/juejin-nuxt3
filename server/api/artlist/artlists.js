import { useGraphql } from '../../../utils/usegraphql'

export default defineEventHandler(async (event) => {
  let Query = getQuery(event);
  let sort = Query.sort;
  let pagenum = Query.pagenum || '';
  let tagid = Query.tagid || 2;
  let sorts = ''
  switch(sort){
    case 'new':
      sorts = 'sort:"createdAt:desc"'
      break;
    case 'hot':
      sorts = 'sort:"good:desc"'
      break;
  }
  const reqQuery = `query {
    articles(filters:{
        tags:{
          id:{
           eq:${tagid}
          } 
        }
      }
      ${sorts}
      pagination: { page: ${pagenum}, pageSize: 10}
    ){
      data{
        id,
        attributes{
          tittle,
          content,
          createdAt,
          good,
          discuss,
          see,
          summary,
          tags{
            data{
              attributes{
                tittle
              }
            }
          },
          author{
            data{
              attributes{
                name,
                discuss,
                level{
                  data{
                    attributes{
                      url
                    }
                  }
                },
                badge{
                  data{
                    attributes{
                      url
                    }
                  }
                },
                headImg{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          },
          img{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles;
})