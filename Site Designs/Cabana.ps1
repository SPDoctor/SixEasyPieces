# To run, uncomment Install-Module and Connect-SPOService if needed, then .\Cabana.ps1

$tenantName = "flosim6"
$adminSiteUrl = "https://$tenantName-admin.sharepoint.com"
#Install-Module -Name Microsoft.Online.SharePoint.PowerShell
#Connect-SPOService -Url $adminSiteUrl

$paletteCabana = @{
"themePrimary" = "#287363";
"themeLighterAlt" = "#f3f9f8";
"themeLighter" = "#d0e9e3";
"themeLight" = "#abd5cc";
"themeTertiary" = "#68ab9c";
"themeSecondary" = "#388473";
"themeDarkAlt" = "#246759";
"themeDark" = "#1f574b";
"themeDarker" = "#164037";
"neutralLighterAlt" = "#eee9e0";
"neutralLighter" = "#eae6dc";
"neutralLight" = "#e1dcd3";
"neutralQuaternaryAlt" = "#d1cdc5";
"neutralQuaternary" = "#c8c4bc";
"neutralTertiaryAlt" = "#c0bcb4";
"neutralTertiary" = "#111111";
"neutralSecondary" = "#171616";
"neutralPrimaryAlt" = "#1d1c1b";
"neutralPrimary" = "#323130";
"neutralDark" = "#282726";
"black" = "#2d2c2c";
"white" = "#f5f0e6";
}

Add-SPOTheme -Identity "Cabana" -Palette $paletteCabana -IsInverted $false

$content = Get-Content '.\Cabana.json' �Raw
 
$script = Add-SPOSiteScript �Content $content -Title "Cabana Site Script�

Add-SPOSiteDesign -Title "Cabana Site Design" -WebTemplate "64" -SiteScripts $script.Id -Description "Cabana site with list and theme"
