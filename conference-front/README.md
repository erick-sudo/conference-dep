# confrence-tracking-frontend
Confrence tracking system 

1. * participants option to input
2. - Numbers - input
3. * Jeff -- Way to generate details about conference, doc, pdf
4. - Erick -- Make filter by dates independent
5. 
6. - Order the conferences by dates, idisplay from the recent to za kitambo
7. - Erick -- Foreigners retain line graphs and dont have it shaded
8. 
9. - Francisca -- Include resolutions/ key topics for each conference, recommendations and conclusions, issues discussed, number of participants 
10. 
11. - Davy -- Have a dropdown for ministries in creating conferences 
12. * Erick -- Have upcoming, present and past events kwa dashboard as numbers
13. * Davy -- Filter for upcoming, present and past events
14. - Erick -- Admin should be able to create sign in details for other adminsr

 <div className="flex-grow py-12">
                  <Routes>
                    <Route path="/" element={<Reports />} />
                    <Route path="/conferences" element={<Conferences />} />
                    <Route
                      path="/conference/:referenceNumber"
                      element={<ConferenceDetails />}
                    />
                    <Route
                      path="/new/conference"
                      element={<CreateConference />}
                    />
                    <Route
                      path="/conference/:refNumber/edit"
                      element={<UpdateConference />}
                    />
                    <Route path="/new/admin" element={<CreateSuperuser />} />
                    <Route path="*" element={<Error404Page />} />
                  </Routes>
                </div>