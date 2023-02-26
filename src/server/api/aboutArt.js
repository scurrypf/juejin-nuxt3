import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  const reqQuery = `query{
    tags(filters:{
        id:{
          eq:2
        }
      }){
      data{
        id,
        attributes{
          tittle,
          articles{
            data{
              attributes{
                tittle,
                good,
                see,
                discuss
              }
            }
          }
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).tags;
})

