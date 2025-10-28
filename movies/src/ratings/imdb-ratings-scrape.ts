import puppeteer from "puppeteer"

;(async () => {
  const browser = await puppeteer.launch({ headless: false })

  const close = async () => browser.close()

  const page = await browser.newPage()
  await page.goto(
    "https://www.imdb.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.imdb.com%2Fregistration%2Fap-signin-handler%2Fimdb_us&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=imdb_us&openid.mode=checkid_setup&siteState=eyJvcGVuaWQuYXNzb2NfaGFuZGxlIjoiaW1kYl91cyIsInJlZGlyZWN0VG8iOiJodHRwczovL3d3dy5pbWRiLmNvbS8_cmVmXz1sb2dpbiJ9&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&tag=imdbtag_reg-20",
  )

  const username = "viktorzetterstrom@gmail.com"
  const password = "Vqw-JWt-oDu-233"

  await page.type("#ap_email", username)
  await page.type("#ap_password", password)

  await page.click("#signInSubmit")
  await page.waitForNavigation({ waitUntil: "load" })

  const [userMenu] = await page.$x("//span[contains(., 'viktorzetterstrom')]")
  if (!userMenu) return await close()
  await userMenu.click()

  const [ratings] = await page.$x("//a[contains(., 'Your ratings')]")
  if (!ratings) return await close()
  await ratings.click()

  await page.waitForNavigation({ waitUntil: "load" })

  // const [exportButton] = await page.$x("//a[contains(., 'export')]");
  // if (!exportButton) return await close();
  // await exportButton.click();

  await page.screenshot({ path: "example.png" })

  await close()
})()
