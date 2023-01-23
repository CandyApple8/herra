#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <chrono>
#include <filesystem>

namespace fs = std::filesystem; 

int main()
{
    std::vector<std::string> exclude_filenames;
    std::ifstream exclude_file("exclude.txt");
    std::string filename;
    while (std::getline(exclude_file, filename))
    {
        exclude_filenames.push_back(filename);
    }

    auto start = std::chrono::system_clock::now();

    for (const auto &entry : fs::directory_iterator("."))
    {
        fs::path file_path = entry.path();

        bool is_excluded = false;
        for (const std::string &ex_filename : exclude_filenames)
        {
            if (file_path.filename() == ex_filename)
            {
                is_excluded = true;
                break;
            }
        }

        if (!is_excluded)
        {
            fs::copy(file_path, "release/" + file_path.filename().string());
            std::cout << "Copied " << file_path.filename() << std::endl;
        }
    }

    auto end = std::chrono::system_clock::now();
    std::chrono::duration<double> elapsed_seconds = end - start;

    std::cout << "Total time elapsed: " << elapsed_seconds.count() << "s" << std::endl;

    std::cout << "Press any key to continue..." << std::endl;
    std::cin.get();

    return 0;
}
