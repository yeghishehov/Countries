import React, { Component } from 'react';
import './countries.css';
import Input from '../Input/Input';
import { Grid, CardMedia, CardContent, Typography, Card } from '@material-ui/core';

export default class Countries extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEmpty: false,
            isLoading: false,
            errorText: "",
            countries: [],
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        this.fetchCountries();
      }

      fetchCountries = (countryName = "") => {
        if (countryName) {
          fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
            .then(res => res.json())
            .then((res) => {
              if (res.status === 404) {
                throw new Error('No Data')
              }
              return res;
            })
            .then(res =>
                this.setState({
                    countries: res,
                    isEmpty: res.length === 0,
                    isLoading: false,
                    errorText: ""
                })
            )
            .catch(err => 
                this.setState({
                    isLoading: false, 
                    errorText: err.message, 
                    countries: []
                })
            );
        } else {
          fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(res => 
                this.setState({
                    countries: res, 
                    isEmpty: res.length === 0, 
                    isLoading: false
                })
            )
            .catch(err => 
                this.setState({
                    isLoading: false, 
                    errorText: err.message
                })
            );
        }
      };
      
      searchCountry = (countryName) => {
        this.setState({isLoading: true});
    
        this.fetchCountries(countryName);
      };

    render() {
        const {isEmpty, isLoading, errorText, countries} = this.state;

        return (
            <div className='main'> 
                <Input onInputClick={this.searchCountry} />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >                
                    {errorText  
                    ? <p>{errorText}</p>
                    : isEmpty
                        ? <p>No Data</p>
                        : isLoading
                            ? <p>Loading ...</p>
                            : countries.map(country =>                                    
                                <Card key={country.name} className="cardStyle">
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom color="primary">
                                            {country.name}
                                        </Typography>
                                        <Typography variant="h6"  gutterBottom color="textSecondary">
                                            {country.capital}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Population: {country.population}
                                        </Typography>
                                        <CardMedia
                                            className='flag'
                                            image={country.flag}
                                            title="Country flag"
                                        />
                                    </CardContent>
                                </Card>                                    
                            )

                    }
                </Grid>
            </div>
        )
    }      
}