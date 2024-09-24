import validateNpmPackageName from "validate-npm-package-name";

const validateProjectName = (projectName: string) => {
  const validateName = validateNpmPackageName(projectName);

  return validateName.validForNewPackages;
};

export default validateProjectName;
