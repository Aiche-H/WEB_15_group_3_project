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

* Kuvat
* Ladattavat tiedostot
* Kirjastot
* Frameworkit

### 📁 pages/

Jokaiselle sivulle oma kansionsa, joka sisältää:

* `index.html` - Sivun päätiedosto
* `📁local-css/` - Sivukohtaiset CSS-tiedostot
* `📁local-javascript/` - Sivukohtaiset JavaScript-tiedostot
* `📁local-data/` - Sivukohtainen data
* `📁local-images/` - Sivukohtaiset kuvat

*Huom: joka tiedosto sivun omassa kansiossa nimetaan esim. `earth.css` korvataan kunkin sivun nimellä*

### 📁 global/

Sisältää koko projektin laajuiset tiedostot:

* CSS-tiedostot
* JavaScript-tiedostot

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
