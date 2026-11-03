$javac = "C:\Program Files\Java\jdk-22\bin\javac.exe"
$repo = "$env:USERPROFILE\.m2\repository"
$jars = Get-ChildItem -Path $repo -Filter *.jar -Recurse | Select-Object -ExpandProperty FullName
$classpath = ("backend\target\classes;" + ($jars -join ";"))
$files = @(
    "backend\src\main\java\com\healthify\dto\RecipeIngredientDTO.java",
    "backend\src\main\java\com\healthify\dto\RecipeDTO.java",
    "backend\src\main\java\com\healthify\dto\ExtractedFoodDetailDTO.java",
    "backend\src\main\java\com\healthify\dto\DocumentExtractionDTO.java",
    "backend\src\main\java\com\healthify\dto\DietFoodItemDTO.java",
    "backend\src\main\java\com\healthify\dto\DietMealDTO.java",
    "backend\src\main\java\com\healthify\dto\DietDayDTO.java",
    "backend\src\main\java\com\healthify\dto\DietPlanDTO.java",
    "backend\src\main\java\com\healthify\dto\AICoachRequest.java",
    "backend\src\main\java\com\healthify\dto\AICoachResponse.java",
    "backend\src\main\java\com\healthify\service\NutritionCalculationService.java",
    "backend\src\main\java\com\healthify\service\DietPlanningService.java",
    "backend\src\main\java\com\healthify\service\GroqCoachService.java",
    "backend\src\main\java\com\healthify\service\UserService.java",
    "backend\src\main\java\com\healthify\controller\AuthController.java",
    "backend\src\main\java\com\healthify\controller\HealthController.java",
    "backend\src\main\java\com\healthify\entity\AIChatMessage.java",
    "backend\src\main\java\com\healthify\repository\AIChatMessageRepository.java",
    "backend\src\main\java\com\healthify\controller\AICoachController.java",
    "backend\src\main\java\com\healthify\controller\DietPlanController.java"
)
Write-Host "Compiling $($files.Count) files with JDK 22..."
& $javac -cp $classpath -d backend\target\classes $files
if ($LASTEXITCODE -eq 0) {
    Write-Host "Java compilation SUCCESSFUL!"
} else {
    Write-Host "Java compilation FAILED with code $LASTEXITCODE"
}
