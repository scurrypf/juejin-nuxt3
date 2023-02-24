import { useGraphql } from '../../utils/useGraph'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    article(id:3){
      data{
        attributes{
          tittle,
          content,
          isPublic,
          createdAt,
          img{
            data{
              attributes{
                name,
                url
              }
            }
          }
        }
      }
    }
  }`
  return (await useGraphql(reqQuery)).article;
})