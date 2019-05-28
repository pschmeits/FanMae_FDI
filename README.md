# FanMae_FDI
Tampermonkey script for importing CSV to Fannie Mae Syndicator Dashboard. (FDI - Fund Data Importer)

The script takes is a specifically formatted CSV and populates the imported data into the corresponding text boxes in the array of text inputs on the Fannie Mae Submissions.

A template with the desired layout is located within the repository and should be titled "Template.xlsx".

The colors of the columns correspond with the type of data to be placed within them.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|    Color   |                 Data                 |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|:----------:|:------------------------------------:|
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|    Green   |         Capital Contributions        |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|    Grey    |          Cash Distributions          |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|    Blue    | LIHTC - *Left: AMT & Right: Non-AMT* |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Light Blue |         Historic Tax Credits         |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|     Red    |                Losses                |

**Note:** *One property that does not exist on the Template but is very important for the importer's success is the "Projected Year". While it isn't a column in the Template it is required that the data line up with the years displayed on the website. Therefore, if the years on the website start one year prior to the information leave a row of zeroes above the data on the template so that the importer knows to import zeroes for that year.*
