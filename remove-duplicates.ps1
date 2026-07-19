$files = @(
    'src/app/recipes/page.tsx',
    'src/app/dashboard/page.tsx',
    'src/app/login/page.tsx',
    'src/app/register/page.tsx',
    'src/app/saved-recipes/page.tsx',
    'src/app/settings/page.tsx',
    'src/app/my-recipes/page.tsx',
    'src/app/my-recipes/add/page.tsx',
    'src/app/my-recipes/edit/[id]/page.tsx',
    'src/app/recipes/[id]/page.tsx'
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $c = Get-Content $f -Raw
        # Remove Navbar import line
        $c = $c -replace 'import \{ Navbar \} from "@/components/common/Navbar";\r?\n', ''
        # Remove Footer import line
        $c = $c -replace 'import \{ Footer \} from "@/components/common/Footer";\r?\n', ''
        # Remove <Navbar /> usage (with optional whitespace)
        $c = $c -replace '\s*<Navbar />\r?\n', "`n"
        # Remove <Footer /> usage (with optional whitespace)
        $c = $c -replace '\s*<Footer />\r?\n', "`n"
        Set-Content $f $c -NoNewline
        Write-Host "Cleaned: $f"
    } else {
        Write-Host "Skipped (not found): $f"
    }
}
Write-Host "All done!"
