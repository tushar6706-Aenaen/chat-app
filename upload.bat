@echo off
REM A simple Windows Batch script to add, commit, and push changes to GitHub.

REM --- Usage ---
REM upload.bat "Your commit message here"
REM -----------------

REM Check if a commit message was provided as an argument.
REM The '%1' variable holds the first argument passed to the script.
IF "%~1"=="" (
    REM If no arguments were given, print an error message and exit.
    echo Error: No commit message provided.
    echo Usage: upload.bat "Your commit message"
    exit /b 1
)

REM --- Main Script Logic ---

echo ^> Starting the upload process...

REM 1. Add all changes to the staging area.
echo    -^> Staging all changes...
git add .

REM 2. Commit the changes with the message provided as the first argument (%1).
echo    -^> Committing changes with message: "%~1"
git commit -m "%~1"

REM 3. Push the committed changes to the remote repository.
echo    -^> Pushing to remote repository...
git push

REM Check the errorlevel of the last command. If it's 0, it was successful.
IF %ERRORLEVEL% EQU 0 (
    echo.
    echo == SUCCESS: Your code has been uploaded to GitHub. ==
) ELSE (
    echo.
    echo == ERROR: The push to GitHub failed. Please check for errors above. ==
)