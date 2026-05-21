import besokPerTime from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/besok-per-time.json';
import besokPerUkedag from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/besok-per-ukedag.json';
import bevegelsesmonster from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/bevegelsesmonster.json';
import konseptmiks from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/konseptmiks.json';
import kjederVsUavhengige from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/kjeder-vs-uavhengige.json';
import utviklingPerAr from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/utvikling-per-ar.json';
import estimertOmsetning from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/estimert-omsetning.json';
import korthandelPerUkedag from '@/data/main-board/nedre-lokka-utsnitt/korthandel/korthandel-per-ukedag.json';
import arligVekst from '@/data/main-board/nedre-lokka-utsnitt/korthandel/arlig-vekst.json';
import korthandelTidsrom from '@/data/main-board/nedre-lokka-utsnitt/korthandel/korthandel-tidsrom.json';

export function getNedreLokkaBevegelseData() {
  return {
    besokPerTime,
    besokPerUkedag,
    bevegelsesmonster,
  };
}

export function getNedreLokkaKorthandelData() {
  return {
    korthandelPerUkedag,
    arligVekst,
    korthandelTidsrom,
  };
}

export function getNedreLokkaKonkurransebildeData() {
  return {
    konseptmiks,
    kjederVsUavhengige,
    utviklingPerAr,
    estimertOmsetning,
  };
}
