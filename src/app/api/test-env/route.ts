import { NextResponse } from 'next/server';

export async function GET() {
  // Test if environment variables are available
  const envVars = {
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    hasMainBoardPassword: !!process.env.MAIN_BOARD_PASSWORD,
    hasAspelinRammPassword: !!process.env.ASPELIN_RAMM_PASSWORD,
    hasBrodreneEvensenPassword: !!process.env.BRODRENE_EVENSEN_PASSWORD,
    hasEiendomssparPassword: !!process.env.EIENDOMSSPAR_PASSWORD,
    hasMallingCoPassword: !!process.env.MALLING_CO_PASSWORD,
    hasMayaEiendomPassword: !!process.env.MAYA_EIENDOM_PASSWORD,
    hasRogerVodalPassword: !!process.env.ROGER_VODAL_PASSWORD,
    hasSioPassword: !!process.env.SIO_PASSWORD,
    hasSpaboPassword: !!process.env.SPABO_PASSWORD,
    nodeEnv: process.env.NODE_ENV,
    // Show first 5 chars and length of each password to verify
    adminPasswordPreview: process.env.ADMIN_PASSWORD?.substring(0, 5) + '...',
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length,
    mainBoardPasswordPreview: process.env.MAIN_BOARD_PASSWORD?.substring(0, 5) + '...',
    mainBoardPasswordLength: process.env.MAIN_BOARD_PASSWORD?.length,
    aspelinRammPasswordPreview: process.env.ASPELIN_RAMM_PASSWORD?.substring(0, 5) + '...',
    aspelinRammPasswordLength: process.env.ASPELIN_RAMM_PASSWORD?.length,
  };

  return NextResponse.json(envVars);
}
