const pdf = require('pdf-parse');
const natural = require('natural');

async function getContactInfo(textDataArray) {
    let length = textDataArray.length
    let contactInfo = [];
    let foundContacts = false;

    for (let i = 0; i < length && !(foundContacts == true && (textDataArray[i] == 'Top Skills' || textDataArray[i] == 'Languages' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Publications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Experience' || textDataArray[i] == 'Education')); i++) {

        if (foundContacts) {
            let temp = textDataArray[i][textDataArray[i].length - 1];
            let data = textDataArray[i];
            while (temp == '-' || temp == '/') {
                i++;
                data += textDataArray[i];
                temp = textDataArray[i][textDataArray[i].length - 1];
            }

            contactInfo.push(data)
        }
        else if (textDataArray[i] == 'Contact') foundContacts = true;
    }

    // Remove data inside parentheses using regular expression
    const modifiedStrings = contactInfo.map(str => str.replace(/\(.*\)/g, ''));

    // Remove extra spaces from the beginning and end of each string
    const trimmedStrings = modifiedStrings.map(str => str.trim());

    return trimmedStrings;
}


async function getSkillsInfo(textDataArray) {
    let length = textDataArray.length
    let skillsInfo = [];
    let foundSkills = false;
    for (let i = 0; i < length && !(foundSkills == true && (textDataArray[i] == 'Languages' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Publications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Experience' || textDataArray[i] == 'Education')); i++) {
        if (foundSkills) skillsInfo.push(textDataArray[i])
        else if (textDataArray[i] == 'Top Skills') foundSkills = true;
    }

    return skillsInfo;
}

async function getLanguageInfo(textDataArray) {
    let length = textDataArray.length
    let languageInfo = [];
    let foundLaguages = false;

    for (let i = 0; i < length && !(foundLaguages == true && (textDataArray[i] == 'Top Skills' || textDataArray[i] == 'Publications' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Experience' || textDataArray[i] == 'Education')); i++) {
        if (foundLaguages) languageInfo.push(textDataArray[i])
        else if (textDataArray[i] == 'Languages') foundLaguages = true;
    }

    // Remove data inside parentheses using regular expression
    const modifiedStrings = languageInfo.map(str => str.replace(/\(.*\)/g, ''));

    // Remove extra spaces from the beginning and end of each string
    const trimmedStrings = modifiedStrings.map(str => str.trim());

    return trimmedStrings;
}


async function getExperienceInfo(textDataArray) {
    let length = textDataArray.length
    let experienceInfo = [];
    let foundExperience = false;

    for (let i = 0; i < length && !(foundExperience == true && (textDataArray[i] == 'Top Skills' || textDataArray[i] == 'Publications' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Languages' || textDataArray[i] == 'Education')); i++) {
        if (foundExperience) {
            // Geting one single exprience info
            const temp = [];
            let organizationLocation = '';
            let organizationName = '';
            let roleName = '';
            let expYear = 0;
            let expMonth = 0;

            while (i < length) {
                if (/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i.test(textDataArray[i])) {
                    // Use regular expressions to match and extract the year and month values
                    const stringData = textDataArray[i];
                    const yearMatch = stringData.match(/(\d+) year/);
                    const monthMatch = stringData.match(/(\d+) month/);

                    if (yearMatch) expYear = parseInt(yearMatch[1], 10);
                    if (monthMatch) expMonth = parseInt(monthMatch[1], 10);
                    i++;

                    if (textDataArray[i].includes(',')) {
                        organizationLocation = textDataArray[i];
                    }

                    break;
                }
                temp.push(textDataArray[i]);
                i++;
            }
            roleName = temp.pop();
            organizationName = temp[0]

            experienceInfo.push({
                organizationName: organizationName,
                organizationLocation: organizationLocation,
                roleName: roleName,
                expYear: expYear,
                expMonth: expMonth
            })
            i--;
        }
        else if (textDataArray[i] == 'Experience') foundExperience = true;
    }

    return experienceInfo;
}



async function getInformationFromPDF(pdfBuffer) {
    const textDataArray = (await pdf(pdfBuffer)).text.trim().split('\n');
    // console.log(textDataArray, "\n\n")
    const contactInfo = await getContactInfo(textDataArray)
    console.log("ContactInfo= \n", contactInfo)

    const skillsInfo = await getSkillsInfo(textDataArray)
    console.log("SkillsInfo= \n",skillsInfo)

    const languageInfo = await getLanguageInfo(textDataArray)
    console.log("LanguageInfo= \n",languageInfo)

    const experienceInfo = await getExperienceInfo(textDataArray)
    console.log("ExperienceInfo= \n",experienceInfo)
    console.log("\n\n\n");
}

module.exports = {
    getInformationFromPDF
};