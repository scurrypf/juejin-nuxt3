import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async (event) => {
  let pages = getQuery(event).pagenum;
  const reqQuery = `query {
    articles(pagination: { page: ${pages}, pageSize: 2 }){
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