#!/bin/bash

# Test All Tenants Script
# Quick testing script to verify all tenants are accessible
# Usage: ./scripts/test-all-tenants.sh

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3000}"
TIMEOUT=5

# Tenants to test
TENANTS=(
  "main-board"
  "aspelin-ramm"
  "brodrene-evensen"
  "eiendomsspar"
  "malling-co"
  "maya-eiendom"
  "roger-vodal"
  "sio"
  "spabo-eiendom"
)

# Counter for results
PASSED=0
FAILED=0

echo ""
echo "======================================"
echo "  Testing All Tenants"
echo "======================================"
echo "Base URL: $BASE_URL"
echo "Timeout: ${TIMEOUT}s"
echo ""

# Function to test a URL
test_url() {
  local url=$1
  local description=$2

  echo -n "Testing $description... "

  if curl -s --max-time $TIMEOUT -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|302\|307"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
    return 1
  fi
}

# Test landing page
echo "=== Landing Page ==="
test_url "$BASE_URL" "Landing page"
echo ""

# Test each tenant
echo "=== Tenants ==="
for tenant in "${TENANTS[@]}"; do
  # Test home page (will redirect to login if not authenticated)
  test_url "$BASE_URL/$tenant" "$tenant (home)"

  # Test login page
  test_url "$BASE_URL/login?tenant=$tenant" "$tenant (login)"
done

echo ""
echo "=== Public Routes ==="
test_url "$BASE_URL/login" "Login page (no tenant)"
echo ""

# Summary
echo "======================================"
echo "  Test Results"
echo "======================================"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo -e "Total:  $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}All tests passed! ✓${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed! ✗${NC}"
  echo ""
  echo "Troubleshooting:"
  echo "1. Ensure dev server is running: npm run dev"
  echo "2. Check the URL: $BASE_URL"
  echo "3. Review the terminal output above for specific failures"
  exit 1
fi
