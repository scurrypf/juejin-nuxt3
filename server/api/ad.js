import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async (event) => {
  let id = getQuery(event).adid;
  const reqQuery = `query {
    ad(id:${id}){
      data{
        attributes{
          adimg{
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
  return (await useGraphql(reqQuery)).ad;
})