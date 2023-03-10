import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    seetags{
      data{
        id,
        attributes{
          tag,
          en
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).seetags.data;
})