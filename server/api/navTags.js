import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    navtags{
      data{
      attributes{
        name,
        en
      }
      }
    }
  }`
  return (await useGraphql(reqQuery)).navtags;
})