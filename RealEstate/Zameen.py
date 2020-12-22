from bs4 import BeautifulSoup
import requests
import datetime
import pandas as pd

class Zameen():
    
    def __init__(self):
        self.list = []
        self.number = 0

    @staticmethod
    def read_url(url):
        page = requests.get(url)
        html = page.text
        return html

    def scrapePage(self, url):
        html = self.read_url(url)
        soup = BeautifulSoup(html, 'lxml')
        rows = soup.findAll('li', class_='ef447dde')
        for i in rows:
            self.list.append(self.get_data_from_row(i))
        next_url = self.toNextPage(soup)
        self.number+=1
        print("Page done:",self.number)
        if next_url is None:
            self.toCsv()
            return
        else:
            self.scrapePage(next_url)

    def get_data_from_row(self, row):
        link = row.find('a', class_='_7ac32433')['href']
        link = "http://zameen.com" + link
        data = self.scrapeAd(link)
        return data

    def scrapeAd(self, url):
        html = self.read_url(url)
        soup = BeautifulSoup(html, 'lxml')
        data = dict()
        
        details = soup.find('ul', class_='_033281ab').findAll('li')
        for i in details:
            data[i.find('span', class_='_3af7fa95').text] = i.find('span', class_='_812aa185').text
        
        description = soup.find('div', class_='_2015cd68').div.span.text
        data['Description'] = description

        amenities = dict()
        try:
            amenities_section = soup.find('ul', class_='_0bde6dbc').findAll('li', class_='_579bdb8a')
            nonsplitable = []
            for i in amenities_section:
                all_features = i.ul.findAll('li')
                for feature in all_features:
                    value = feature.text
                    splitable = value.split(':')
                    if len(splitable)==2:
                        amenities[splitable[0]] = splitable[1]
                    else:
                        nonsplitable.append(value)
            amenities['Others'] = nonsplitable
        except:
            pass
        year = ''
        floor = ''
        try:
            year = int(amenities['Built in year'])
        except:
            year = None

        try:
            floor = int(amenities['Floors'])
        except:
            floor = None
        data['YearBuilt'] = year
        data['Floor'] = floor

        latitude = ''
        longitude = ''

        script = soup.findAll('script')[1]
        script = str(script).split(',')
        for i in script:
            if 'latitude' in i:
                latitude = i.split(':')[1]
            if 'longitude' in i:
                longitude = i.split(':')[1]
        data['longitude'] = longitude
        data['latitude'] = latitude
        data['Added'] = self.convertDate(data['Added'])
        data['Price'] = self.convertPrice(data['Price'])
        return data

    def convertDate(self, time):
        if 'minutes' in time or 'hour' in time:
            return str(datetime.date.today())
        if 'day' in time:
            spliting_date = time.split(' ')
            return str(datetime.date.today() - datetime.timedelta(int(spliting_date[0])))
        if 'week' in time:
            spliting_date = time.split(' ')
            return str(datetime.date.today() - datetime.timedelta(int(spliting_date[0]) * 7))
        if 'month' in time:
            spliting_date = time.split(' ')
            return str(datetime.date.today() - datetime.timedelta(int(spliting_date[0]) * 30))
        if 'year' in time:
            spliting_date = time.split(' ')
            return str(datetime.date.today() - datetime.timedelta(int(spliting_date[0]) * 365))

    
    def convertPrice(self, price):
        price = price.replace('PKR','').split(' ')
        if price[1] == 'Lakh':
            return round(float(price[0])*100000)
        if price[1] == 'Crore':
            return round(float(price[0])*10000000)
        if price[1] == 'Arab':
            return round(float(price[0])*1000000000)

    def toNextPage(self, soup):
        try:
            next_url = soup.find('a', class_='b7880daf')['href']
            next_url = "https://www.zameen.com"+next_url
            return next_url
        except:
            return None

    def toCsv(self):
        df = pd.DataFrame(self.list)
        df.to_csv(str(datetime.date.today()))

if __name__ == "__main__":
    a = Zameen()
    a.scrapePage('https://www.zameen.com/Homes/Islamabad-3-1.html?sort=date_desc')
    
