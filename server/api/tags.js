import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    tags{
      data{
        id,
        attributes{
          tittle
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).tags;
})