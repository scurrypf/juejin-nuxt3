// import axios from 'axios'

// export async function useGraphql(query) {
//   const runtimeConfig = useRuntimeConfig() //获取cms地址，根据运行环境提供本地或部署网址
//   const data = JSON.stringify({
//     query,
//   })
//   const config = {
//     method: 'post',
//     url: runtimeConfig.public.graphql_url,
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': '*/*',
//       'Connection': 'keep-alive',
//     },
//     data,
//   }

//   const res = await axios(config)
//   console.log(res.data)
//   return res.data
// }
