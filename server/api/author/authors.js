import { useGraphql } from '../../utils/usegraphql'

export default defineEventHandler(async () => {
  const reqQuery = `query {
    authors(pagination:{start:0,limit:3}){
    data{
    attributes{
      name,
      level{
        data{
          attributes{
            url
          }
        }
      }
      discuss,
      headImg{
        data{
          attributes{
            url
          }
        }
      }
    }
  }
}
}`
  return (await useGraphql(reqQuery)).authors.data;
})

