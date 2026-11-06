const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});
 for(const width of [360,390,768,900,1024,1440]){
  const context=await browser.newContext({viewport:{width,height:900},offline:true,reducedMotion:'reduce'});const page=await context.newPage();
  await page.goto('file://'+path.resolve(__dirname,'../index.html'));
  for(const step of [1,2]){assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(step===1){const b=await page.locator('.practice-card').boundingBox();await page.mouse.move(b.x+b.width*.75,b.y+50);await page.mouse.down();await page.mouse.move(b.x+b.width*.15,b.y+50,{steps:5});await page.mouse.up();assert.equal(await page.locator('.practice-stamp').textContent(),'NEXT.');await page.getByRole('button',{name:'Keep swiping',exact:true}).click()}else {await page.getByRole('button',{name:'See my rundown',exact:true}).click();await page.getByRole('button',{name:'Okay, I’m thrilled and ready to pay all',exact:true}).click()}}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const nav=await page.locator('#nav').boundingBox();assert(nav.x>=0&&nav.x+nav.width<=width);const pay=await page.getByRole('button',{name:'Pay',exact:true}).boundingBox();if(width<900)assert(pay.y+pay.height<=nav.y,'Pay must be above bottom navigation at '+width);
  const ids=await page.locator('svg [id]').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(new Set(ids).size,ids.length);
  if(width===1440)await page.screenshot({path:'/private/tmp/sugarbills-desktop-final.png',fullPage:true});
  for(const tab of ['Post','Leaderboard','Me']){await page.getByRole('button',{name:tab,exact:true}).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),tab+' overflow at '+width)}
  await page.getByRole('button',{name:'Reset demo',exact:true}).click();await page.getByRole('button',{name:'Reset everything',exact:true}).click();assert.equal(await page.locator('#toast').textContent(),'');await page.emulateMedia({colorScheme:'dark'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===390)await page.screenshot({path:'/private/tmp/sugarbills-onboarding-dark-final.png',fullPage:true});
  console.log('PASS '+width+'px: both onboarding steps, practice drag, all tabs, navigation bounds, unique SVG IDs, dark mode');await context.close();
 }
 await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
