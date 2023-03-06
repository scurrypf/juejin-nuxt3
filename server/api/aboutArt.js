import { useGraphql } from '../../utils/usegraphql'

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
          tittle,
          good,
          discuss
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles.data;
})

