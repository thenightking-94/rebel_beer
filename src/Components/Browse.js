import React, { useEffect, useState } from 'react';
import { Grid, Divider, Typography, FormControl, MenuItem, Select } from '@material-ui/core';
import '../CSS/page.css';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import Loader from 'react-loader-spinner';

const text_style = {
    fontVariant: 'small-caps',
    fontSize: '14px',
    textAlign: 'center'
};

function Browse() {
    const [array, setarray] = useState([]);
    const [arrayImage, setimage] = useState([]);
    const [browse_beer, setbrowse] = useState('style');
    const [show, setshow] = useState([]);


    useEffect(() => {
        let beerData = fetch(" https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        beerData.then(res => res.json()).then(json => setarray(json));
        let beerImage = fetch("  https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        beerImage.then(res => res.json()).then(json => setimage(json));


    }, [])

    useEffect(() => {
        if (array && arrayImage) {
            console.log(arrayImage)
            if (browse_beer == 'style') {
                var res = [];
                res = array.map(item => item.style);
                res = new Set(res);
                res = [...res];
                var temp = [];
                for (var i = 0; i < res.length; i++) {
                    for (var j = 0; j < array.length; j++) {
                        if (res[i] == array[j].style)
                            temp = [...temp, array[j]];
                    }

                }
                setshow(temp);
            }
            if (browse_beer == 'name') {
                var res = [];
                res = array.map(item => item.name);
                res = new Set(res);
                res = [...res];
                var temp = [];
                for (var i = 0; i < res.length; i++) {
                    for (var j = 0; j < array.length; j++) {
                        if (res[i] == array[j].name)
                            temp = [...temp, array[j]];
                    }
                }
                setshow(temp);
            }

        }


    }, [array, arrayImage, browse_beer])




    return (
        <div id='body'>

            <div className='heading_after'><Typography id='head_text'>Welcome to Beer-pedia</Typography></div>

            <Divider style={{ background: 'white', height: window.innerWidth > 768 ? '100px' : '80px' }} />
            <Grid container direction='row' justify='center' alignItems='center'>
                <FormControl>
                    <Select
                        value={browse_beer}
                        onChange={(e) => {
                            setbrowse(e.target.value)
                        }}
                    >

                        <MenuItem style={text_style} value={'style'}><p style={text_style}>Sorted by brand</p></MenuItem>
                        <MenuItem style={text_style} value={'name'}><p style={text_style}>Sorted by name</p></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Divider style={{ background: 'white', height: window.innerWidth > 768 ? '50px' : '30px' }} />

            {
                !(show.length > 0) &&
                <Loader style={{ marginTop: '250px', marginLeft: '45%' }}
                    type="Bars"
                    color="#ad1b02"
                    height={40}
                    width={50}
                    timeout={300}


                />
            }


            <div className='layout_div'>

                {
                    show.length > 0 && arrayImage && window.innerWidth > 768 &&
                    <Grid className='grid_lay' container >
                        {show.map(item =>

                            <Grid style={{ padding: '20px' }} item md={3}>
                                <ScrollAnimation delay={150} animateIn="fadeIn">
                                    <div id='img_div' style={{ width: '90%', height: '400px', backgroundSize: 'cover', backgroundImage: `url(${arrayImage[(Math.floor(Math.random() * 4) + 0)].image})` }}  ></div>
                                    <Typography id='map_text'>{item.name}</Typography>
                                    <Typography id='map_text'>{item.style}</Typography>
                                    <Typography id='map_text'>{item.abv}</Typography>
                                </ScrollAnimation>
                            </Grid>
                        )
                        }
                    </Grid>

                }
                {
                    show.length > 0 && arrayImage && window.innerWidth < 768 &&
                    <Grid className='grid_lay' container >
                        {show.map(item =>


                            <Grid item xs={4}>
                                <ScrollAnimation delay={150} animateIn="fadeIn">
                                    <div id='img_div' style={{ width: '90%', height: '200px', backgroundSize: 'cover', backgroundImage: `url(${arrayImage[(Math.floor(Math.random() * 4) + 0)].image})` }}  ></div>
                                    <Typography id='map_text'>{item.name}</Typography>
                                    <Typography id='map_text'>{item.style}</Typography>
                                    <Typography id='map_text'>{item.abv}</Typography>
                                </ScrollAnimation>
                            </Grid>
                        )
                        }
                    </Grid>

                }

            </div>




        </div>
    );
}

export default Browse;