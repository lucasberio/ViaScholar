import Airtable from 'airtable'
import fs from 'fs'

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE);

const table = base('Available Scholarships');

export async function getRecs() {
  const allScholarships = [];

  try {
    console.log('Starting Airtable query...');
    
    // Wrap eachPage in a Promise to properly await completion
    await new Promise((resolve, reject) => {
      table.select({
        //maxRecords: 5,
        view: 'Grid view'
      }).eachPage(
        (records, fetchNextPage) => {
          //console.log('Processing page with', records.length, 'records');
          
          records.forEach((record, index) => {
            // console.log(`Processing record ${index + 1}:`, {
            //   'Fund Name': record.get('Fund Name'),
            //   'Application Process': record.get('Application Process'),
            //   'Scholarship Amount': record.get('Scholarship Amount')
            // });

            const scholarship = {
              name: record.get('Fund Name'),
              provider: record.get('Application Process'),
              amount: record.get('Scholarship Amount'),
              due_date: record.get('Application Close Date'),
              link: record.get('Apply Here!'),
              study_fields: record.get('Course of Study'),
              requirements: [
                ...parse_crit(record),
                "Must be " + record.get('Enrollment Status'),
                record.get('Geographic')
              ].filter(Boolean)
            };
            
            //console.log('Created scholarship object:', scholarship);
            allScholarships.push(scholarship);
          });

          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error("Airtable API error:", err);
            reject(err);
          } else {
            console.log('Airtable query completed successfully');
            resolve();
          }
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error in getRecs:", err);
  }
  
  //console.log("Returning", allScholarships.length, "scholarships");
  
  return allScholarships;
}

function parse_crit(record) {
  try {
    const str = record.get('Application Criteria (you may have to expand section to retrieve all information)');
    
    if (!str) {
      console.log('No criteria string found for record');
      return [];
    }
    
    const criteria = [];
    let start = 0;
    for (let index = 0; index < str.length; index++) {
      if (str.charAt(start) === 'o' || str.charAt(start) === '-') start += 2;
      if (str.charAt(index) === '\n') {
        criteria.push(str.substring(start, index).trim());
        start = index + 1;
      }
    }
    return criteria;
  } catch (error) {
    console.error('Error parsing criteria:', error);
    return [];
  }
}

async function extractAndSaveScholarships() {
  try {
    console.log('Fetching scholarships from Airtable...');
    const scholarships = await getRecs(); // Await the async function
    
    console.log('Writing scholarships to file...');
    fs.writeFileSync('raw_scholarships.json', JSON.stringify(scholarships, null, 2), 'utf8');
    
    console.log(`Successfully saved ${scholarships.length} scholarships to raw_scholarships.json`);
    return scholarships;
  } catch (error) {
    console.error('Error in extractAndSaveScholarships:', error);
    throw error;
  }
}
