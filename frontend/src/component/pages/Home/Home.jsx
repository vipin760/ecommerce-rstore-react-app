import React, { Fragment } from "react";
import "./Home.css";
import Product from './Product.jsx'

const product = {
  name:"T-shirt",
  images:[{url:"data:image/webp;base64,UklGRtYMAABXRUJQVlA4IMoMAABwQgCdASqMAMwAPj0cjEQiIaEUyhUQIAPEtLa/rbZ/QjvN5pVqEfNrMX38A6dysDNJ+GuytD5z8r/jhszP8f+Wf5K/jTFZTM/yP5heNV6UfWv/fedvzC33H1A/5L/Yv9P9w/yW/8P+T/ID3zfR3/D9w/+Z/1H/Yf3T95f8P4Cv239jX9ZjOyM5f7O8BoUqWHGx+QMbAHxz5Nxd3m16j5a3iYfH5CyXxTApguRMzUzkFQ0s4wqzsZxKKvccen2t1nFXgwVpc9VuOxNc0cES1WOE04XWmOtBhMl0R+UAk6TEk/i2uzunKEou/6GGHcJzhJ+f5N6aojBfU7kFkXMNB98HwFIimdj7VRgEgVsS6Q0dXp4IDJkTEk6uJ0Gl8XK2eWIRkTPz3xdJ7OsRWL8ToH2ppkf82JGqIuh7Qj4He8KEVNSsQsLrApDbwpOZdLqoVSfKWhhd8rIMdTZsyJdzJsIZExfXu8QC0D7knLcdfSijpW8J6/1/st66Xi2fsIBLn7nN8trufz3n6uk9eE46SSL/sFBxS6vOE6tSUjgo0JnLXRoXtpGrkcxdzt22UhLbWT0vKnFLX8UXgMgmJ0j8wqtKyXq9D7RZM6suPDR9fNVHyIxVQRwN90EOx/OgEscvNn8ehpxXv9dSz9YnLJzUvzMtCFAuuVM9vvdMB1LMJIg8uAPxwrQ6mZ7+M5KQOS4IyzE0Ia35CDAvSR6PlgAA/v4PIAjfqdfn9qw6ezlUcH5LhqEI/SY00D/dwHiCAjeFe7f9amrd05MDRs76JtR9rmGz0FuEYKw0/Sl2/nsE9bwNCOE9jAPdyjZRcjCCSqrIldesOwUesLqRc29mXz8BHxFmKQG1B30XjerHLt5levaFrc1HNG08pBY+1QPkbniMRNQ7p58Yp3kzUkBZN/f4+Ut+XbTnx2oRloll6VzzISeziK7FSK9IbW8vHdIJYqZnlHUhIidkFxRzAE8NAP+ZpOLp6bRSyK1WBzWRYQ69VUjKuYPHeP/4pn2nd/9YfOybYLH1hXIatXsyzCFx1qNC4PVbGoSQkEogLXHLamD4QdxNBN2YJzJisxChe4EggorU4dO+OtcVdXp2muDD0IwAcfDNtP+XJbUideUMgd7Hn69tBq/5N/pjLq7IIWtZddtKPDc3P9qdq3uvyodsApwYoOr4y+6zcZi//Ke4TtbC2t+N6e03/NIQADVhT3U/kdktGbDZAVOcC3FoxVd1+Dw3Rg0Fr8sir9lGXCbHSe68PKkvPq3u2XOoSkAm3qt+NsctZsoqy2PTOq7tq8bzJXH+Z4v5jalT6QLoB5JmXW/FiW2QjpH+Z/VEXyrNu/7yzDlk5+WXvvkNU7WIi0iAeU4HARm2R5aeBHjzLxmIG4hI7ZaorMRElkrJ3nv6Pa16VmJS+WzPxCIfsx/xJaCY/usDoij+0etI60epE/BrlYUD4ALmm94E8KJ+9Jx4H+F8T219dmbilJHNOi+yAwA3wFykrmT8gxFJS7BF6Fo7SxpobC9xnqs0LeedpyLDZ7BT6sZf1PIR/BoREDdtkeao2acngIm/trp15SmhmRBoPhl/VRRyGp++0WPsbIf99MQ9bmErJGh31CMkULBBhhdW2hc+c5RzR3kwwjgjNaECtCL60MtgaEhnK5K6JxN1ehTpbsKmMFickaIMy+l1tAb2AmdhEpnG+udPGl2bY1jaXA1RhGZaN/CJxSZx6H/+v5mllgMDE8vAKUHsnuCGJ9OIDmIO8tLilZIaO1IUT87RNCrdlSA/qwgjK5FGpe2D1skKOxBWNtYQ2kFYH3NYqApRtdonQSvvqH4inCK+RTL3ZU6dQETgV/T7NEPqDv6ETY0QtMsY0fp0sHkjeHer6iLz8dYemqKQI/h9pF9y9bf4WUiC/G17RR8IwyqfrSjU8MOc2BGfNCVm7r94ic4AOa7dPinT0fDUN3ci92pwFXEQwVc8tQ/dz8vR+ZJAjH5al9S0iCfRD+X+ZEv/AWEX3PKOa2clt/k/60+yFP4R9p5wvh0aeyfcc4KdvUWz91xM8d7raCuiSCQ+6hpd95iiC/KNMsufccjJoXDDEuuAfzuTkLKcIVGEPYfBiDHwkhLYRSed2FNWeWgDIPiHWFvkk0ASrde/WN8ZRCYqlx9GIs9OI5nWqD+2jCuh1liHRYXee3jI7cvl7oq+2Bro/rrAUsP75n60TmcexmWfmV8PVJesZ8pmBn42Fzaeqcgf5MmBjBj6aCpf1B6sq4ysegMimz3KskVrBJWv/JfspS2VV7Kt4gLIsE2zs2nALhO4tWj9ZRlwdKDigJ2r8OETQT+aktxgFIjtYjVuCRmtiTqq6hY4FebQCFYJlF/AWp3agY+PKcEyzY1G//LUEJjFqIrBOJd5ZQ0l5xbe5uqMDDTw9y4yM1jipmsbHHU93UciyBZkn21W5oB4Somv06n8mKKwSbYGqYkSv71ykFKF5Oa2av6oDfjtj7IqXD6S647F+4qAZMm4GeUS6Kfs20HcG//O+TpLZ6qfrdMwYc5qR5FpeNO+LWzlme/s22Vl9d9V8V8jMDd+QqPKzKFwwEDP7ZvGFM4+Ib7i+8AOMzaGtUXxyEt0/xrp0AfW+aXmo8OZd4tsNjNot6tPPl2BxmMpuO7wtylP/5TZewUZ/rwu+UBeZ/kVsjjl8+x6gOSD8hVl3+n0zbyiZBUX4uhQ8ADzz3TVeB0lzBqV2iMBelGBT+wjR71Yf/sFdruSHPlyIgvz3cBiZ/TZNxc8tT2ifVP8j7dipMKXpT6mo4ZNlOdaJRhKQNH0lSO21ZiKMmBAEcjlDFKGkfoWFPi7BMuXcKu6kJn90rzL0ZUDLQXo4VTghCT/B0rDlUiaRhK6roZGY0b8353z3qDJFIFYnwGwa3zOu2rH9NOIIkKjSoFBwrL1UKA9dvQgjMBXLSEJ6bgf9VsWqqNB/Ogjy/jmfaHXlPANR949cvDOerFY1WCxnQbEF/bzHDLZLg3aeTmTakXhN5NGbUBRfvwFERRRjRv0Pmz/HakgNFyOb1lwHG+dAMzXrc17g8Gz70qImkVJK+qKOrCEKwDgApbO+jN6Ftr5H0Ka44LVNlIeNS9ux1thGCrWJmxmQ4UqQblFPt6NX0zizKeV6uIghgs04R5CplYHCCS4DVkXza33oIV6qKeVz0TQHpVyNi5Szc2rlWBfIsWTjqCOa1UxcIotLc3msfJtpfa8Mx5vpZ/Fr0CDGH+uREkSXQcH1SE6+tsg0eSilJMkvDR0vMNAxbwIVv02VLuj1DYyAHHTjipodkM8RQBqg6nNVRiyTUFKwS6QlFmd4tJbX2ioakZzullybgPpZ3/bPmbt/LNhazp1XOjink84wiBy5gvwhZmIp+o+m3AL3Rge7gAnVVNafwsfb94OHRJGwrtthHug4Jru/NzUSG5c1VTKlwMWh8LxJ5aZZeLsDy+6Pl2L/sWbgHChxX2QtFNNh1loftnOoILaOJKltruZPL2EwiWbGThGT961mD1ChNcRVRIlss5NXSgnfBAyi0TCXjhhlnix22zOHQDfBkUFLzJ2dMGEuA/+RPzqbLlqMbACJPebjN4ox9IAR5HWUuRVt/oX02by/JQZV8p+kxR/KKIJh/Qaabot7mIBqhPfSIxcWfTqKE3hqvkaQz6RLKfViSrG9CpFYpGmQsVMiJ4RBkba+12Lzwa5UWIgl1KLgXevOVL2fpnGhFp+0lCj0IIeEf69ylWKc6avGusX51Mc/wL4I3rDK7ph3PFh/sLDJH0u27kE1X+VosTn1Pg3fkmAIxcKjYYpEWacTC9nEUtvYGxinGl0LdvKLCCZsyEqgGT8h8EsU35RnWg7I1L004suecdjjHt7XNPOLYEzAuNCuPRlmgqaw/exsHUBPvDC/pJ9+oEm1DTMaA4VXiJZbhqKvpnchSfDUU/6L+NSHd8wiDOlubGb9eDMMt5fBfbXYngQyiJg5P09YrWHV1PxoicbgNLJMdlcQEAuxSyniRdQzs37/iJrPkMhVe0eWm46iyniL/VvR9YT8vxTPQqEUYFBFO32G19SL9fLsNJfSvxoYPEIb6zJU/Q3LsDPPtXCRQTWPKpLn6dHLqhLQXVVw82bPRAJb/UFNkKr7rsCMD39A2GJtiNx1UMHIaFflVg80vm0DF+wsFgUhmmE/d4su6zU8kG5eUzoyjRkm3YWje/WaVrqQLDkH+hZzVtCbUzAsF2kB/4JPPHxyKlE97RY8P4owCd28lXbZtBmPZK9c/rEAgJcRtaWyOec6rWZP1pY6eQ1l4mL/nZRM3h9El5R3g2X3u1IftoY3LvPO1ZVmYcEKeJnvFmsL2MMuhFrOlKnazNME3aqB9qPTn9L0lhUTL2k97grefNoAAAA"}],
  price:"$3000",
  _id:"A00012"
}

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to R-Store</p>
        <h1>Find Amazing Product Below</h1>
        <a href="#container">
          <button>
            scroll <i className="fa-solid fa-computer-mouse"></i>
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
      </div>
    </Fragment>
  );
};

export default Home;
