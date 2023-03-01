import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async (event) => {
  let pages = getQuery(event).pagenum;
  let tagId = getQuery(event).tag;
  const reqQuery = `query {
    articles(filters:{
      tags:{
        id:{
          eq:${tagId}
        }
      },
    }
    pagination: { page: ${pages}, pageSize: 4 }){
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
                url,
                previewUrl,
                hash
              }
            }
          }
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles.data;
})