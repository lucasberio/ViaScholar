import cron from 'node-cron'
import fs from 'fs'
import { getRecs } from '../api_scripts/airtable.js'
import { get_parsed_file } from '../api_scripts/chatgpt_scripts.js'

export function startRecsJob() {
  cron.schedule('32 18 * * *', async () => {
    console.log(`Inside cron job`)
    let new_data = await getRecs()
    //console.log(`Length of returned array is: ${new_data.length}`);

    let cur_data = JSON.parse(fs.readFileSync(`./cron_jobs/raw_scholarships.json`, `utf8`))

    const new_str = JSON.stringify(new_data, null, 2);
    const cur_str = JSON.stringify(cur_data, null, 2);

    let update_needed = new_str !== cur_str;

    if (update_needed) {
      console.log('=== UPDATE TRIGGERED ===');
      fs.writeFileSync(`./cron_jobs/raw_scholarships.json`, new_str, `utf-8`)

      console.log("starting gpt call")
      const new_parsed_data = await get_parsed_file(new_data)
      fs.writeFileSync(`./cron_jobs/parsed_scholarships.json`, JSON.stringify(new_parsed_data, null, 2), `utf-8`)
      console.log("finsihed gpt call")
    } else {
      console.log('=== NO UPDATE NEEDED ===');
    }
  });
}


