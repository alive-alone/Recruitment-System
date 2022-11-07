const CryptoJS = require('crypto-js')
//CBC模式
export default {
  // 特别注意：此次是将密文写死到函数内部，也可以当成函数的参数进行动态绑定密文,列如：
  encrypt(word: string) {
    const keyStr = 'abcdefG1234567' // 密钥
    const ivStr = 'abcdefG1234567' // 偏移量

    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const srcs = CryptoJS.enc.Utf8.parse(word)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC, //加密模式，与后台一致
      padding: CryptoJS.pad.Pkcs7 //填充方式，与后台一致
    })

    return encrypted.toString()
  },
  // 解密
  decrypt(word: string) {
    const keyStr = 'abcdefG1234567'
    const ivStr = 'abcdefG1234567'

    const base64 = CryptoJS.enc.Utf8.parse(word)
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const src = CryptoJS.enc.Utf8.stringify(base64)
    const decrypt = CryptoJS.AES.decrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
  }
}
