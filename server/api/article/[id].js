import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async (event) => {
  let n = event.context.params.id;
  const reqQuery = `query {
    article(id:${n}){
      data{
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
              id,
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
  return (await useGraphql(reqQuery)).article;
})