import { awscdk } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.81.0',
  defaultReleaseBranch: 'main',
  name: 'account-share',
  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  devDeps: ['cdk-nag'],
  tsconfig: {
    compilerOptions: {
      noUnusedLocals: false,
    },
  },
});

// const taskSourceEnv = project.addTask('sourceEnv', {
//   description: 'Source .env file',
//   exec: '. ./.env',
// });
// project.preCompileTask.prependSpawn(taskSourceEnv);
// project.preCompileTask.env('ACCOUNT_VIEW', '$ACCOUNT_VIEW');
// project.preCompileTask.env('ACCOUNT_SHARE', '$ACCOUNT_SHARE');

project.synth();