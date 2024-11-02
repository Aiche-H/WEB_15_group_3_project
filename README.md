# version info

## Navigointi

* [2024-10-10](#2024-10-10)
* [2024-10-15](#2024-10-15)
* [2024-10-25](#2024-10-25)

## Päivitysten julkaiseminen

lisäykset tulee julkaista aina **feature/nimi**-branchiin.

**Ohjeet:**

1. Luo uusi branch nimellä **feature/[planeetan nimi]**.
2. Tee muutokset.
3. lisää muutokset **README.md** tidostooon.
4. Julkaise muutokset githubiin **branchillä jonka loit**
5. Tee pull request pääbranchiin.

**Tällä varmistetaan, että:**

* Kaikki muutokset ovat helposti seurattavissa.
* Vältetään merge-konflikteja.
* Projektin koodi pysyy järjestyksessä.

## päivitykset ja lisäykset

-pohjat planeetoille tehty ja meta tiedot lisätty

-testattu uusi branch + merge + testattu visual studio codessa - Johannes + markus + Riikka

## 2024-10-10

**Olen toteuttanut seuraavat muutokset sivuston navigointiin:**

* **Uusi logo ja sivunavigointi:** Lisäsin uuden, visuaalisesti houkuttelevan logon ja implementoin toimivan sivunavigoinnin, joka parantaa sivuston käytettävyyttä.
* **Parannettu JavaScript-toiminnallisuus:** Muokkaamalla js-tiedostoa varmistin, että sivunavigointi toimii sujuvasti ja responsiivisesti kaikilla laitteilla.
* **Dropdown-valikko planeetoille:** Lisäsin dropdown-valikon, jonka avulla käyttäjät voivat helposti siirtymällä eri planeettojen välillä.
* **Visuaaliset parannukset Materialize CSS:llä:** Hyödynnin Materialize CSS -kirjastoa luodakseni miellyttävän käyttökokemuksen:
  * **Hover-efekti:** Navigointipalkki vaihtuu vaaleammaksi väriltään, kun käyttäjä siirtää hiiren osoittimen sen päälle.
  * **Selkeät linkit:** Avattavan valikon linkkien väri on muutettu mustaksi, mikä parantaa luettavuutta.

## 2024-10-15

Kyllä, voin kirjoittaa tämän sinulle ammattimaisemmin suomeksi:

**Commit viesti:**

Lisättiin kaikille sivuille yhteinen footer [alaviite] sekä varmistettiin, että ikonit toimivat kaikilla sivuilla. Lisättiin myös navigaatio kaikkiin index-tiedostoihin.

**Muutokset:**

* Lisättiin footer kaikille sivuille
* Korjattiin ikonien toimiminen kaikilla sivuilla
* Lisättiin navigaatio kaikkiin index-tiedostoihin

**Tiedostomuutokset:**

* README.md (muokattu)
* index.html (muokattu)
* indexFiles/ (kansio)
  * indexContact.html (muokattu)
  * indexEarth.html (muokattu)
  * ... (muut index-tiedostot)

## 2024-10-25

### Projektin kansiorakenteen päivitys

## Uusi kansiorakenne

Projektin kansiorakenne on päivitetty selkeämmäksi ja paremmin skaalautuvaksi. Kaikki muutokset on testattu huolellisesti toimivuuden varmistamiseksi.

### 📁 resources/

Sisältää kaikki projektin yleiset resurssit:

* `📁images/`:projektin laajat kuvat
* `📁data/`:projektin laajat ladattavat tiedostot
* `📁css/`:projektin laajat css kirjastot ja frameworkit
* `📁javascript/`:projektin laajat javascript kirjastot ja frameworkit

### 📁 pages/

Jokaiselle sivulle oma kansionsa, joka sisältää:

* `index.html` - Sivun päätiedosto esim: `earth.html`
* `📁local-css/` - Sivukohtaiset CSS-tiedostot
* `📁local-javascript/` - Sivukohtaiset JavaScript-tiedostot
* `📁local-data/` - Sivukohtainen data
* `📁local-images/` - Sivukohtaiset kuvat

*Huom: joka tiedosto sivun omassa kansiossa nimetään esim. `earth.css` korvataan kunkin sivun nimellä*

### 📁 global/

Sisältää koko projektin laajuiset tiedostot:

* `📁CSS`: global.css
* `📁javascript`: global.js

## Muutoksien hyödyt

* Selkeämpi ja johdonmukaisempi kansiorakenne

* Parempi skaalautuvuus projektin kasvaessa
* Helpompi ylläpidettävyys
* Sivukohtaisten resurssien selkeä organisointi
* Testattu yhteensopivuus - kaikki linkitykset toimivat

## Testaus

Kaikki muutokset on testattu perusteellisesti:

* Tiedostojen linkitykset
* Resurssien saatavuus
* Sivujen toimivuus

## 2024-10-31

## README: Muutokset aurinko-sivulle

### Tehdyt muutokset

* **Uusien tiedostojen lisääminen:**
  * `header.css`: Sisältää tyylit sivun otsikko-osalle.
  * `orbitanimation.css`: Sisältää tyylit kiertoradan animaatioihin.
  * `header.js`: Sisältää JavaScript-koodia, joka hallinnoi otsikon toiminnallisuuksia (esim. interaktiivisuus).
* **Tiedostojen sijainti:** Kaikki yllä mainitut tiedostot on lisätty `global`-kansioon.
* **CSS-luokkien lisääminen:** Sivun asetteluun on lisätty uusia CSS-luokkia, jotka määrittelevät elementtien ulkoasun ja sijainnin. Nämä luokat hyödyntävät `header.css` ja `orbitanimation.css` -tiedostoissa määriteltyjä tyylejä.

### Muutosten vaikutus

Nämä muutokset parantavat aurinko-sivun ulkoasua ja käyttäjäkokemusta. Uudet CSS-luokat mahdollistavat dynaamisemman ja visuaalisesti miellyttävämmän sivun rakenteen. `orbitanimation.css` tuo sivulle interaktiivisuutta ja visuaalista kiinnostavuutta. `header.js` on custom navigoinnin hoves efektin toiminnallisuus.

**Tarkempi kuvaus muutoksista:**

* `header`-elementille on lisätty luokka `.headerContainer`, joka määrittelee sen koon, fontin ja värit.
* `orbitanimation.css` sisältää animaation, joka pyörittää kuvaa hitaasti ympyrän muotoisessa radassa. Animaatio on liitetty
* `header.js` sisältää JavaScript-koodin, joka muuttaa custom planeetta navigoinnin ulkonäköä hoverilla.

## 2024-11-01

Toki! Tässä on muutamia pidempiä ilmoitusvaihtoehtoja, joihin voit lisätä vielä lisää yksityiskohtia projektistasi ja tavoitteistasi:

### **HTML-prototyypit Mercurius- ja Venus-projekteille**

Haluan ilmoittaa, että olen aloittanut HTML-prototyyppien kehittämisen sekä Mercurius- että Venus-projekteille. Tällä hetkellä olen keskittynyt luomaan visuaalisen käyttöliittymän, joka heijastaa projektien tavoitteita ja tarjoaa käyttäjille intuitiivisen kokemuksen.

**Mercurius-projekti:**

* Prototyyppi sisältää kuvia ja tekstin toimivan navigoinnen ja muita toiminallisuuksia.

### **Venus-projekti:**

* Prototyypin kehitys on alkuvaiheessa.

## 2024-11-02

* viimeistelty venus HTML prtotyyppi
* viimeistelty maa HTML prototyyppi
