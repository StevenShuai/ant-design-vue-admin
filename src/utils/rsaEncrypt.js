import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb3v06evW4igH4MftmZgVGqJyc\n' +
                  '6MGPUvUjrqlExtDUk6ygHaN15MQ7H79x/xiUp0QejTtS8s6bM63Jm612cFgySuEV\n' +
                  '2a6W8DOHZ/J6dh3mc8bdrcrSaVqq0dkJJMOJn6KUh4Umn7RxcXcfmK9RL90wyUGM\n' +
                  'oXE9Q/W+LRvM1ckCmQIDAQAB'

const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJve/Tp69biKAfgx\n' +
                   '+2ZmBUaonJzowY9S9SOuqUTG0NSTrKAdo3XkxDsfv3H/GJSnRB6NO1Lyzpszrcmb\n' +
                   'rXZwWDJK4RXZrpbwM4dn8np2HeZzxt2tytJpWqrR2Qkkw4mfopSHhSaftHFxdx+Y\n' +
                   'r1Ev3TDJQYyhcT1D9b4tG8zVyQKZAgMBAAECgYAVinaSe2Wz8Bafl0C4AQdfoXOr\n' +
                   'V5tQVFWebcfkwlkf15y2sAHkDA52YUfS2D8sZAVM95WoO/gDiNvOjd4mDRaS/YDL\n' +
                   'jK3vmzwtpSwr++LWwQxKDPPiu385T2BnZ6cP9orUflPr3nLSmTNnPLpEL7xAzWnf\n' +
                   'ZRRacPuiHtvgV7TdAQJBAMocI/Qa3BmX4CkgQsn3uZNv+tgoPPRfBi5i5frFy9bb\n' +
                   'bvmDM0bAhm/JpTBntm6FeYgJPYN7bufqpxzfmfpO0jkCQQDFbp7soTRRe+LnX4MO\n' +
                   'AlEPLIqq9MKkf5dzKffcG1FeiLUVBRUdPJZLXZZxZSwuSx9dospT0B0RuzzBbmRy\n' +
                   'WjNhAkBXtZigwdtMvA1Kq7ZwYbJGWq1YizXQs0BCdybpCleouXfSjm59QOXWs4Kd\n' +
                   'nBSeqAwSzjfEzJdXzAyTyjHPX895AkBox12GncMjX4k7W+A0phwY3n21XvKR1Lku\n' +
                   'wF4vrTvQ3OKlhi3/dzEYTFHUWmpJI0tBKW0RcAiNaX5D9e9PFPnhAkEAxnmgohM1\n' +
                   'RB/gDeNEUjoiIB6lyKDV+HGFVeTqnv9d3yQ/qDboOiY3n7xt1RkEubDo/erfFwMD\n' +
                   'yuDZR1GhEKTEvg=='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

