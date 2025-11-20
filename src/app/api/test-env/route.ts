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
    // Show first 3 chars of admin password to verify it's set correctly
    adminPasswordPreview: process.env.ADMIN_PASSWORD?.substring(0, 3) + '...',
  };

  return NextResponse.json(envVars);
}
