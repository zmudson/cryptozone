import React from 'react';

const Stats = ({ abbr, price, openDayPrice, hashes, lowDayPrice, highDayPrice, marketCap, supply, volume }) => {
    const teraHashes = (hashes / 1000000000000).toFixed(2);
    const stylizedMarketCap = Number(marketCap.toFixed(0)).toLocaleString();
    const stylizedVolume = Number(volume.toFixed(0)).toLocaleString();
    const stylizedSupply = Number(supply.toFixed(0)).toLocaleString();
    return (
        <div className="box-table">
            <table>
                <caption>Statistics</caption>
                <tbody>
                    <tr>
                        <th>Price</th>
                        <th>Open Day</th>
                        <th>High Day</th>
                        <th>Low Day</th>
                    </tr>
                    <tr>
                        <td>$ {price}</td>
                        <td>$ {openDayPrice}</td>
                        <td>$ {highDayPrice}</td>
                        <td>$ {lowDayPrice}</td>
                    </tr>
                    <tr>
                        <th>Market Cap</th>
                        <th>Volume (day)</th>
                        <th>Circulating Supply</th>
                        <th>Hashes per Second</th>
                    </tr>
                    <tr>
                        <td>$ {stylizedMarketCap}</td>
                        <td>$ {stylizedVolume}</td>
                        <td>{stylizedSupply} {abbr}</td>
                        <td>{teraHashes} TH/s</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Stats;