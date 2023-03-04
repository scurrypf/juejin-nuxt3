import { useGraphql } from '../../utils/useGraph'

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