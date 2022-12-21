exports.CompaniesToExcel = asyncCatchMiddleware(async (req, res, next) => {
  const companies = await Company.findAll({
    include: [{ all: true }],
  });
  const companiesDate = companies
    .map((x) => x.get({ plain: true }))
    .map((company, i) => {
      return {
        id: i + 1,
        Name: `${company.companyName} ${company.CompanyType['shortName']}`,
        'Activity Type': company.ActivityType['name'],
        'Start Date': company.companyStartDate,
        'End Date': company.companyEndDate,
        Address: `${company.Region['name']}, ${company.Country['name']}, ${company.City['name']}, ${company.companyAddress}`,
        Emails: company.emails?.map((email) => email.email).join(', '),
        'Phone Numbers': company.phoneNumbers?.map((phone) => phone.companyPhoneNumber).join(', '),
      };
    });
  exportToExcel(companiesDate, 'Companies', res);
});
exports.CompaniesToPdf = asyncCatchMiddleware(async (req, res, next) => {
  const companies = await Company.findAll({
    include: [{ all: true }],
  });
  const companiesData = companies
    .map((x) => x.get({ plain: true }))
    .map((company, i) => {
      return {
        id: i + 1,
        Name: `${company.companyName} ${company.CompanyType['shortName']}`,
        'Activity Type': company.ActivityType['name'],
        'Start Date': company.companyStartDate,
        'End Date': company.companyEndDate,
        Address: `${company.Region['name']}, ${company.Country['name']}, ${company.City['name']}, ${company.companyAddress}`,
        Emails: company.emails?.map((email) => email.email).join(', '),
        'Phone Numbers': company.phoneNumbers?.map((phone) => phone.companyPhoneNumber).join(', '),
      };
    });
  exportToPdf(companiesData, 'Companies', res);
});
exports.CompaniesToWord = asyncCatchMiddleware(async (req, res, next) => {
  const companies = await Company.findAll({
    include: [{ all: true }],
  });
  const companiesData = companies
    .map((x) => x.get({ plain: true }))
    .map((company, i) => {
      return {
        id: i + 1,
        Name: `${company.companyName} ${company.CompanyType['shortName']}`,
        'Activity Type': company.ActivityType['name'],
        'Start Date': company.companyStartDate,
        'End Date': company.companyEndDate,
        Address: `${company.Region['name']}, ${company.Country['name']}, ${company.City['name']}, ${company.companyAddress}`,
        Emails: company.emails?.map((email) => email.email).join(', '),
        'Phone Numbers': company.phoneNumbers?.map((phone) => phone.companyPhoneNumber).join(', '),
      };
    });
  exportToWord(companiesData, 'Companies', res);
});
exports.CompaniesPrint = asyncCatchMiddleware(async (req, res, next) => {
  const companies = await Company.findAll({
    include: [{ all: true }],
  });
  const companiesData = companies
    .map((x) => x.get({ plain: true }))
    .map((company, i) => {
      return {
        id: i + 1,
        'Company Name': `${company.companyName} ${company.CompanyType['shortName']}`,
        'Activity Type': company.ActivityType['name'],
        'Company Start Date': company.companyStartDate,
        'Company End Date': company.companyEndDate,
        'Company Address': `${company.Region['name']}, ${company.Country['name']}, ${company.City['name']}, ${company.companyAddress}`,
        'Company Emails': company.emails?.map((email) => email.email).join(', '),
        'Company Phone Numbers': company.phoneNumbers
          ?.map((phone) => phone.companyPhoneNumber)
          .join(', '),
      };
    });
  printPreview(exportToPdf(companiesData, 'Companies'), res);
});

//current report services
exports.getCurrentDayService = asyncCatchMiddleware(async (req, res, next) => {
  const today = new Date();
  const result = await Company.findAndCountAll({
    include: [{ all: true }],
    where: {
      companyStartDate: {
        [Op.like]: `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? '0' : ''}${
          today.getMonth() + 1
        }-${today.getDate() < 10 ? '0' : ''}${today.getDate()}%`,
      },
    },
  });
  if (!result) {
    throw new GlobalError('No data found', 404);
  }
  const rr = result?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
  const r = await ApiSearch.paginate(req, rr);
  res.render('pages/company/company-info/companies', {
    title: 'Companies',
    ...r,
  });
});
exports.getCurrentWeekService = asyncCatchMiddleware(async (req, res, next) => {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 7;
  const firstday = new Date(today.setDate(first));
  const lastday = new Date(today.setDate(last));
  const result = await Company.findAndCountAll({
    include: [{ all: true }],
    where: {
      companyStartDate: {
        [Op.between]: [
          `${firstday.getFullYear()}-${firstday.getMonth() + 1 < 10 ? '0' : ''}${
            firstday.getMonth() + 1
          }-${firstday.getDate() < 10 ? '0' : ''}${firstday.getDate()}`,
          `${lastday.getFullYear()}-${lastday.getMonth() + 1 < 10 ? '0' : ''}${
            lastday.getMonth() + 1
          }-${lastday.getDate() < 10 ? '0' : ''}${lastday.getDate()}`,
        ],
      },
    },
  });
  if (!result) {
    throw new GlobalError('No data found', 404);
  }

  const rr = result?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
  const r = await ApiSearch.paginate(req, rr);
  res.render('pages/company/company-info/companies', {
    title: 'Companies',
    ...r,
  });
});
exports.getCurrentMonthService = asyncCatchMiddleware(async (req, res, next) => {
  const today = new Date();
  const firstday = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastday = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const result = await Company.findAndCountAll({
    include: [{ all: true }],
    where: {
      companyStartDate: {
        [Op.between]: [
          `${firstday.getFullYear()}-${firstday.getMonth() + 1 < 10 ? '0' : ''}${
            firstday.getMonth() + 1
          }-${firstday.getDate() < 10 ? '0' : ''}${firstday.getDate()}`,
          `${lastday.getFullYear()}-${lastday.getMonth() + 1 < 10 ? '0' : ''}${
            lastday.getMonth() + 1
          }-${lastday.getDate() < 10 ? '0' : ''}${lastday.getDate()}`,
        ],
      },
    },
  });
  if (!result) {
    throw new GlobalError('No data found', 404);
  }
  const rr = result?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
  const r = await ApiSearch.paginate(req, rr);
  res.render('pages/company/company-info/companies', {
    title: 'Companies',
    ...r,
  });
});
exports.getcurrentQuarterService = asyncCatchMiddleware(async (req, res, next) => {
  const today = new Date();
  const quarter = Math.floor((today.getMonth() + 3) / 3);
  const firstday = new Date(today.getFullYear(), quarter * 3 - 3, 1);
  const lastday = new Date(today.getFullYear(), quarter * 3, 1);
  const result = await Company.findAndCountAll({
    include: [{ all: true }],
    where: {
      companyStartDate: {
        [Op.between]: [
          `${firstday.getFullYear()}-${firstday.getMonth() + 1 < 10 ? '0' : ''}${
            firstday.getMonth() + 1
          }-${firstday.getDate() < 10 ? '0' : ''}${firstday.getDate()}`,
          `${lastday.getFullYear()}-${lastday.getMonth() + 1 < 10 ? '0' : ''}${
            lastday.getMonth() + 1
          }-${lastday.getDate() < 10 ? '0' : ''}${lastday.getDate()}`,
        ],
      },
    },
  });
  if (!result) {
    throw new GlobalError('No data found', 404);
  }
  const rr = result?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
  const r = await ApiSearch.paginate(req, rr);
  res.render('pages/company/company-info/companies', {
    title: 'Companies',
    ...r,
  });
});
exports.getCurrentYearService = asyncCatchMiddleware(async (req, res, next) => {
  const today = new Date();
  const firstday = new Date(today.getFullYear(), 0, 1);
  const lastday = new Date(today.getFullYear() + 1, 0, 1);
  const result = await Company.findAndCountAll({
    include: [{ all: true }],
    where: {
      companyStartDate: {
        [Op.between]: [
          `${firstday.getFullYear()}-${firstday.getMonth() + 1 < 10 ? '0' : ''}${
            firstday.getMonth() + 1
          }-${firstday.getDate() < 10 ? '0' : ''}${firstday.getDate()}`,
          `${lastday.getFullYear()}-${lastday.getMonth() + 1 < 10 ? '0' : ''}${
            lastday.getMonth() + 1
          }-${lastday.getDate() < 10 ? '0' : ''}${lastday.getDate()}`,
        ],
      },
    },
  });
  if (!result) {
    throw new GlobalError('No data found', 404);
  }
  const rr = result?.rows?.map((t) => t.get({ plain: true })).map((x) => x);
  const r = await ApiSearch.paginate(req, rr);
  res.render('pages/company/company-info/companies', {
    title: 'Companies',
    ...r,
  });
});
