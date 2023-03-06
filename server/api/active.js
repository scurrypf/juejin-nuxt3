import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    actives{
      data{
        attributes{
          name,
          en
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).actives;
})