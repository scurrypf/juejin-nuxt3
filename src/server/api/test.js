import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    articles{
      data{
        attributes{
          tittle,
          content,
          isPublic
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).articles.data;
})
