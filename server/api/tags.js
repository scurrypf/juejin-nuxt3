import { useGraphql } from '../../utils/usegraphql'

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