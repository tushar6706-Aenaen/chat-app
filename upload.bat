@echo off
echo ^> Fixing GitHub Contributions...

REM 1. Check current Git configuration
echo    -^> Current Git Configuration:
echo       Name: 
git config user.name
echo       Email: 
git config user.email
echo.

REM 2. Prompt for GitHub email if needed
set /p github_email="Enter your GitHub email (or press Enter to skip): "
IF NOT "%github_email%"=="" (
    git config --global user.email "%github_email%"
    echo    -^> Updated email to: %github_email%
)

REM 3. Prompt for GitHub username if needed
set /p github_name="Enter your GitHub username (or press Enter to skip): "
IF NOT "%github_name%"=="" (
    git config --global user.name "%github_name%"
    echo    -^> Updated name to: %github_name%
)

echo.
echo    -^> Checking repository status...

REM 4. Check remote repository
git remote -v
IF %ERRORLEVEL% NEQ 0 (
    echo    -^> No remote repository found!
    set /p repo_url="Enter your GitHub repository URL: "
    git remote add origin "!repo_url!"
)

REM 5. Check current branch
FOR /F "tokens=*" %%i IN ('git branch --show-current') DO SET current_branch=%%i
echo    -^> Current branch: %current_branch%

REM 6. Switch to main branch if not already
IF NOT "%current_branch%"=="main" (
    echo    -^> Switching to main branch...
    git checkout -b main 2>nul || git checkout main
)

REM 7. Check for uncommitted changes
git status --porcelain | findstr /r /c:"." >nul
IF %ERRORLEVEL% EQU 0 (
    echo    -^> You have uncommitted changes. Committing them now...
    git add .
    git commit -m "Fix: Update repository structure and configurations"
)

REM 8. Push to main branch
echo    -^> Pushing to main branch...
git push -u origin main
IF %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo == SUCCESS: Contributions should now ==
    echo ==          appear on GitHub!        ==
    echo ========================================
    echo.
    echo What was fixed:
    echo - Git email configuration
    echo - Remote repository connection  
    echo - Branch settings (switched to main)
    echo - Pushed commits to GitHub
    echo.
    echo Note: It may take a few minutes for
    echo contributions to appear on GitHub.
) ELSE (
    echo.
    echo ========================================
    echo ==    ERROR: Push failed!           ==
    echo ========================================
    echo.
    echo Please check:
    echo 1. Repository URL is correct
    echo 2. You have push permissions
    echo 3. Repository exists on GitHub
    echo 4. Internet connection is working
)

echo.
echo    -^> Final Git Configuration:
git config --list | findstr user
echo.
pause