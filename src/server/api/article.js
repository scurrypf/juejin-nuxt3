import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  let n = 5;
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