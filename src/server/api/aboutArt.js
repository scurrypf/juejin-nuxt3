import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async (event) => {
  let id = getQuery(event).authid;
  const reqQuery = `query {
    articles(filters:{
      author:{
        id:{
          eq:${id}
        }
      }
    }){
      data{
        id,
        attributes{
          tittle
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles.data;
})

