import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  let n = 3;
  const reqQuery = `query {
    article(id:${n}){
      data{
        attributes{
          tittle,
          content,
          isPublic,
          createdAt,
          good,
          discuss,
          see,
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
                name,
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