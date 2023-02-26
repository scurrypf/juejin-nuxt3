import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    articles{
      data{
        id,
        attributes{
          tittle,
          content,
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles.data;
})
