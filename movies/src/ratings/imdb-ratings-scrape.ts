import puppeteer from "puppeteer"
;(async () => {
  const browser = await puppeteer.launch({ headless: false })

  const close = async () => browser.close()

  const page = await browser.newPage()
  await page.goto(
    "https://www.imdb.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.imdb.com%2Fregistration%2Fap-signin-handler%2Fimdb_us&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=imdb_us&openid.mode=checkid_setup&siteState=eyJvcGVuaWQuYXNzb2NfaGFuZGxlIjoiaW1kYl91cyIsInJlZGlyZWN0VG8iOiJodHRwczovL3d3dy5pbWRiLmNvbS8_cmVmXz1sb2dpbiJ9&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&tag=imdbtag_reg-20",
  )

  const username = ""
  const password = ""

  await page.locator("#ap_email").fill(username)
  await page.locator("#ap_password").fill(password)

  await page.locator("#signInSubmit").click()
  await page.waitForNavigation({ waitUntil: "load" })

  const userMenu = await page.locator('::-p-text(viktorzetterstrom)').waitHandle()
  if (!userMenu) return await close()
  await userMenu.click()

  const ratings = await page.locator('::-p-text(Your ratings)').waitHandle()
  if (!ratings) return await close()
  await ratings.click()

  await page.waitForNavigation({ waitUntil: "load" })

  // const exportButton = await page.locator('::-p-text(export)').waitHandle();
  // if (!exportButton) return await close();
  // await exportButton.click();

  await page.screenshot({ path: "example.png" })

  await close()
})()
