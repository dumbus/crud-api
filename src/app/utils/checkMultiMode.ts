const checkMultiMode = () => {
    const args = process.argv.slice(2);
  
    const passedArg = args.find((arg) => arg.startsWith('--'));
  
    if (passedArg) {
        const mode = passedArg.slice(2);
        
        return mode === 'multi' ? true : false;
    }
  
    return false;
};

export { checkMultiMode };
