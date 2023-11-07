const pdf = require('pdf-parse');
const natural = require('natural');

async function getContactInfo(textDataArray) {
    let length = textDataArray.length
    let  contactInfo = [];
    let foundContacts = false;

    for(let i=0;i<length  && !(textDataArray[i] == 'Top Skills' || textDataArray[i] == 'Languages' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Experience' || textDataArray[i] == 'Education') ; i++) {
        if(textDataArray[i] == 'Contact') foundContacts = true;

        if(foundContacts) contactInfo.push(textDataArray[i])
    }

    // Removing extra infomation
    contactInfo.shift();
    contactInfo.pop()
    
    return contactInfo;
}


async function getSkillsInfo(textDataArray) {
    let length = textDataArray.length
    let  skillsInfo = [];
    let foundSkills = false;

    for(let i=0;i<length  && !(textDataArray[i] == 'Languages' || textDataArray[i] == 'Certifications' || textDataArray[i] == 'Honors-Awards' || textDataArray[i] == 'Experience' || textDataArray[i] == 'Education') ; i++) {
        if(textDataArray[i] == 'Top Skills') foundSkills = true;

        if(foundSkills) skillsInfo.push(textDataArray[i])
    }

    // Removing extra infomation
    skillsInfo.pop()

    return skillsInfo;
}


async function getInformationFromPDF(pdfBuffer) {
    const textDataArray = (await pdf(pdfBuffer)).text.trim().split('\n');
    // console.log(textDataArray,"\n\n")
    const contactInfo = await getContactInfo(textDataArray)
    console.log(contactInfo)

    const skillsInfo = await getSkillsInfo(textDataArray)
    console.log(skillsInfo)
}

module.exports = { 
    getInformationFromPDF
 };