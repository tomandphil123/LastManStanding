describe ("Loads webpage",  () => {
  it("loads webpage", () => {
      cy.visit('https://www.mylastmanstanding.xyz/')
  })
  it("premierLeagueInfo",  () => {
    cy.request({
      url: 'https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/premierLeagueInfo',
      method: 'GET',
    })
    .then(resp => {
      expect(resp.status).to.eq(200);
      expect(resp.data).to.contain([]);
    })
  })
  it("loads whatIsLastManStanding", () => {
    cy.get("MuiPaper-root.MuiCard-root.ruleCard.MuiPaper-elevation1.MuiPaper-rounded")
      .should("not.be.empty")
  })
})
